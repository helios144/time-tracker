<?php

namespace App\Controller;

use FOS\RestBundle\Controller\AbstractFOSRestController;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use App\Repository\UserRepository;
use App\Entity\User;

/**
 * @Rest\Route("/api/user")
 */
class UserController extends AbstractFOSRestController
{
    private $userRepository;
    private $passwordEncoder;
    private $entityManager;

    public function __construct(UserRepository $userRepository, UserPasswordEncoderInterface $passwordEncoder, EntityManagerInterface $entityManager)
    {
        $this->userRepository = $userRepository;
        $this->passwordEncoder = $passwordEncoder;
        $this->entityManager = $entityManager;
    }


    /**
     * @Rest\Post("/register", name="user.register")
     * @Rest\RequestParam(name="email", description="Email address", nullable=false, pattern="^([a-zA-Z0-9\.]+@+[a-zA-Z]+(\.)+[a-zA-Z]{2,3})$")
     * @param Request $request
     */
    public function register(Request $request): \FOS\RestBundle\View\View
    {
        $email = $request->get('email');
        $password = $request->get('password');
        $user = $this->userRepository->findOneBy([
            'email' => $email
        ]);

        if (!is_null($user)) {
            return $this->view([
                'message' => 'User already exists'
            ], Response::HTTP_CONFLICT);
        }

        $user = new User();
        $user->setEmail($email);
        $user->setPassword(
            $this->passwordEncoder->encodePassword($user, $password)
        );
        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return $this->view($user, Response::HTTP_CREATED);
    }
}
