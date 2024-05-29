package org.iesbelen.proyecto_integrado.security.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserResponse updateUser(UserRequest userRequest) {
        User user = User.builder().idUser(userRequest.getId()).firstname(userRequest.getFirstname()).lastname(userRequest.getLastname()).country(userRequest.getCountry()).rol(Rol.USER).build();
        userRepository.updateUser(user.getIdUser(), user.getFirstname(), user.getLastname(), user.getCountry());

        return new UserResponse("El usuario se registró correctamente");
    }

    public UserDTO getUser(long id) {
        User user = userRepository.findById(id).orElse(null);

        if (user != null) {
            UserDTO userDTO = UserDTO.builder().id(user.getIdUser()).username(user.getUsername()).firstname(user.getFirstname()).lastname(user.getLastname()).country(user.getCountry()).build();
            return userDTO;
        }
        return null;
    }

}
