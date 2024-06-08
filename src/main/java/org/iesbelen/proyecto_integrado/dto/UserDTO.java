package org.iesbelen.proyecto_integrado.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private long id;
    private String username;
    private String firstname;
    private String lastname;
    private String country;
    private String password;
    private String rol;
}
