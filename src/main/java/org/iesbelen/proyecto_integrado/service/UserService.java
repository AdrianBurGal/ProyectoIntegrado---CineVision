package org.iesbelen.proyecto_integrado.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.iesbelen.proyecto_integrado.domain.User;
import org.iesbelen.proyecto_integrado.dto.UserDTO;
import org.iesbelen.proyecto_integrado.exception.UserNotFoundException;
import org.iesbelen.proyecto_integrado.exception.UsernameDuplicateException;
import org.iesbelen.proyecto_integrado.repository.UserRepository;
import org.iesbelen.proyecto_integrado.auth.UserRequest;
import org.iesbelen.proyecto_integrado.auth.UserResponse;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public UserResponse updateUser(UserRequest userRequest) {
        User user = User.builder()
                .idUser(userRequest.getId())
                .lastname(userRequest.getLastname())
                .firstname(userRequest.getFirstname())
                .country(userRequest.getCountry())
                .password(passwordEncoder.encode(userRequest.getPassword()))
                .rol(userRequest.getRol())
                .build();
        userRepository.updateUser(user.getIdUser(), user.getUsername(), user.getLastname(), user.getFirstname(), user.getCountry(), user.getPassword());

        return new UserResponse("El usuario se registró correctamente");
    }

    public UserDTO getUser(long id) {
        User user = userRepository.findById(id).orElse(null);

        if (user != null) {
            return UserDTO.builder()
                    .id(user.getIdUser())
                    .username(user.getUsername())
                    .firstname(user.getFirstname())
                    .lastname(user.getLastname())
                    .country(user.getCountry())
                    .password(user.getPassword())
                    .rol(user.getRol())
                    .build();
        }
        return null;
    }

    public List<User> all() {
        return this.userRepository.findAll();
    }

    public User save(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new UsernameDuplicateException("El email ya se encuentra registrado");
        }

        User newUser = User.builder()
                .username(user.getUsername())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .country(user.getCountry())
                .password(passwordEncoder.encode(user.getPassword()))
                .rol(user.getRol())
                .build();
        return this.userRepository.save(newUser);
    }

    public User one(Long id) {
        return this.userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    public User replace(Long id, User user) {
        return this.userRepository.findById(id).map(u -> (id.equals(user.getIdUser()) ?
                        this.userRepository.save(user) : null))
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    public void delete(Long id) {
        this.userRepository.findById(id).map(user -> {
                    this.userRepository.delete(user);
                    return user;
                })
                .orElseThrow(() -> new UserNotFoundException(id));
    }

}
