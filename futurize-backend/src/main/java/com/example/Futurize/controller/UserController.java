package com.example.Futurize.controller;

import com.example.Futurize.user.User;
import com.example.Futurize.user.UserRepository;
import com.example.Futurize.user.UserReponseDTO;
import com.example.Futurize.user.UserRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("User")
public class UserController {

    @Autowired
    private UserRepository repository;


    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public void saveUser(@RequestBody UserRequestDTO data){
        User userData = new User(data);
        repository.save(userData);
        return;

    }
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public List<UserReponseDTO> getAll(){

        List<UserReponseDTO> userList = repository.findAll().stream().map(UserReponseDTO::new).toList();
        return userList;
    }
}
