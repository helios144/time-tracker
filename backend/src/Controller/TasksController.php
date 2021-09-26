<?php

namespace App\Controller;

use FOS\RestBundle\Controller\AbstractFOSRestController;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Request\ParamFetcher;
use App\Repository\TaskRepository;
use App\Entity\Task;
use Symfony\Component\Security\Core\Security;
use Doctrine\ORM\EntityManagerInterface;
use FOS\RestBundle\Context\Context;
use App\Entity\User;

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
    public function getTasks(): \FOS\RestBundle\View\View
    {
        /** @var User $user */
        $user = $this->security->getUser();
        $tasks = $this->taskRepository->findBy(['user' => $user->getId()]);
        return $this->view($tasks, Response::HTTP_OK)->setContext((new Context())->setGroups(['normal']));
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
