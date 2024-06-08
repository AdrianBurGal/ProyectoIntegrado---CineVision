package org.iesbelen.proyecto_integrado.auth;

import lombok.RequiredArgsConstructor;
import org.iesbelen.proyecto_integrado.exception.UsernameDuplicateException;
import org.iesbelen.proyecto_integrado.jwt.JwtService;
import org.iesbelen.proyecto_integrado.domain.User;
import org.iesbelen.proyecto_integrado.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        User user = userRepository.findByUsername(request.getUsername()).orElseThrow();
        String token = jwtService.getToken(user);
        return AuthResponse.builder().token(token).user(user).build();
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new UsernameDuplicateException("El email ya se encuentra registrado");
        }
        User user = User.builder()
                .username(request.getUsername())
                .lastname(request.getLastname())
                .firstname(request.getFirstname())
                .country(request.getCountry())
                .password(passwordEncoder.encode(request.getPassword()))
                .rol("NORMAL_USER")
                .build();
        userRepository.save(user);

        return AuthResponse.builder().token(jwtService.getToken(user)).build();
    }
}
