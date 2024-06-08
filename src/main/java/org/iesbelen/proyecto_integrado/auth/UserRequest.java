package org.iesbelen.proyecto_integrado.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {
    private long id;
    private String username;
    private String lastname;
    private String firstname;
    private String country;
    private String password;
    private String rol;
}
