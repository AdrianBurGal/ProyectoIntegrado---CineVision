package org.iesbelen.proyecto_integrado.controller;

import lombok.extern.slf4j.Slf4j;
import org.iesbelen.proyecto_integrado.domain.User;
import org.iesbelen.proyecto_integrado.dto.UserDTO;
import org.iesbelen.proyecto_integrado.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/administration/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping({"", "/"})
    public List<User> all() {
        log.info("Accediendo a todos los usuarios");
        return this.userService.all();
    }

    @PostMapping({"/newUser", "/newUser/"})
    public User newUser(@RequestBody User user) {
        return this.userService.save(user);
    }

    @GetMapping({"{id}"})
    public ResponseEntity<UserDTO> one(@PathVariable("id") long id) {
        log.info("Accediendo al usuario");
        UserDTO userDTO = userService.getUser(id);
        if (userDTO == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(userDTO);
    }

//    @PutMapping("replaceUser/{id}")
//    public ResponseEntity<UserResponse> updateUser(@RequestBody UserRequest userRequest) {
//        return ResponseEntity.ok(userService.updateUser(userRequest));
//    }

    @PutMapping("/replaceUser/{id}")
    public User replaceUSer(@PathVariable("id") Long id, @RequestBody User user) {
        log.info("Modificando.... " + user);
        return this.userService.replace(id, user);
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/deleteUser/{id}")
    public void deleteUser(@PathVariable("id") Long id) {
        log.info("Borrando usuario con id: " + id);
        this.userService.delete(id);
    }

}
