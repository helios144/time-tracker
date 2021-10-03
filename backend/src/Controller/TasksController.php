<?php

namespace App\Controller;

use FOS\RestBundle\Controller\AbstractFOSRestController;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Request\ParamFetcher;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use App\Repository\TaskRepository;
use App\Entity\Task;
use Symfony\Component\Security\Core\Security;
use Doctrine\ORM\EntityManagerInterface;
use FOS\RestBundle\Context\Context;
use App\Entity\User;
use App\Components\DocumentGenerator\DocumentGeneratorFactory;
use App\Components\DocumentGenerator\PdfGenerator;
use Symfony\Component\HttpFoundation\StreamedResponse;

/**
 * @Rest\Route("/api/tasks")
 */

class TasksController extends AbstractFOSRestController
{

    private $taskRepository;
    private $entityManager;
    private $security;

    public function __construct(TaskRepository $taskRepository, EntityManagerInterface $entityManager, Security $security)
    {
        $this->taskRepository = $taskRepository;
        $this->entityManager = $entityManager;
        $this->security = $security;
    }
    /**
     * @Rest\Get("")
     */
    public function getTasks(Request $request): \FOS\RestBundle\View\View
    {
        /** @var User $user */
        $user = $this->security->getUser();
        $tasks = $this->taskRepository->findBy(['user' => $user->getId()]);

        $pageSize = 5;
        $totalCount = count($tasks);
        $pages = ceil($totalCount / $pageSize);
        $page = intval($request->get('page', 1));
        $page = (!$page || $page <= 0) ? 1 : $page;
        $page = $page > $pages ? $pages : $page;
        $pageTasks = [];
        foreach ($tasks as $key => $value) {
            if ($key < ($page * $pageSize) && $key >= ($page * $pageSize - $pageSize)) {
                $pageTasks[] = $value;
            }
        }
        $result = [
            'tasks' => $pageTasks,
            'pagination' => [
                'page' => $page,
                'pages' => $pages,
                'pageSize' => $pageSize,
                'totalCount' => $totalCount
            ]
        ];
        return $this->view($result, Response::HTTP_OK)->setContext((new Context())->setGroups(['normal']));
    }

    /**
     * @Rest\Get("/{fileType}")
     */
    public function getTasksReport(Request $request, string $fileType): StreamedResponse
    {

        /** @var User $user */
        $user = $this->security->getUser();
        $dateFrom = new \DateTime($request->get('date-from', date('Y-m-d')));
        $dateTill = new \DateTime($request->get('date-till', date('Y-m-d')));
        $tasks = $this->taskRepository->findByUserAndDate($user->getId(), $dateFrom, $dateTill);


        $generator = DocumentGeneratorFactory::getGenerator($fileType);
        $formatedData  = [['Title', 'Comment', 'Time Spent(min.)', 'Date']];
        foreach ($tasks as &$task) {
            $taskArray =
                $taskArray =  [
                    $task->getTitle(),
                    $task->getComment(),
                    $task->getTimeSpent(),
                    $task->getDate()->format('Y-m-d')
                ];
            $formatedData[] = $taskArray;
        }
        unset($task);

        $contentType = '';
        switch ($fileType) {
            case 'csv':
                $contentType = "application/csv; charset=utf-8";
                $generator->setData($formatedData);
                break;
            case 'pdf':
                $contentType = "application/pdf; charset=utf-8";
                /** @var PdfGenerator $generator */
                $generator->setHtml($this->renderView('report.html.twig', ['data' => $formatedData]));
                break;
            case 'xlsx':
                $contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=utf-8";
                $generator->setData($formatedData);
                break;
            default:
                throw new BadRequestHttpException('Incorrect file type or unsupported');
                break;
        }


        $output = $generator->generate();
        $response = new StreamedResponse(function () use ($output) {
            echo $output;
            flush();
        }, Response::HTTP_OK, [
            'Content-Type' => $contentType,
            'Content-Disposition' => "attachment; filename=\"report.$fileType\"",
            'Access-Control-Expose-Headers' => 'Content-Disposition'
        ]);
        return $response;
    }

    /**
     * @Rest\Post("")
     * @Rest\RequestParam(name="title", description="Title of the task", nullable=false)
     * @Rest\RequestParam(name="comment", description="Comment of the task", nullable=false)
     * @Rest\RequestParam(name="timeSpent", description="Timespent on the task", nullable=false)
     * @Rest\RequestParam(name="date", description="Date of the task", nullable=true)
     */
    public function setTask(ParamFetcher $paramFetcher): \FOS\RestBundle\View\View
    {
        $title = $paramFetcher->get('title');
        $comment = $paramFetcher->get('comment');
        $timeSpent = $paramFetcher->get('timeSpent');
        $date = $paramFetcher->get('date');
        if ($title && $comment && $timeSpent) {
            $task = new Task();
            $task->setTitle($title);
            $task->setComment($comment);
            $task->setTimeSpent($timeSpent);
            $task->setDate($date ? new \DateTime($date) : new \DateTime());
            $task->setUser($this->security->getUser());
            $this->entityManager->persist($task);
            $this->entityManager->flush();
            return $this->view($task, Response::HTTP_CREATED)->setContext((new Context())->setGroups(['normal']));
        }
        return $this->view(['message' => 'Something went wrong'], Response::HTTP_BAD_REQUEST);
    }
}
