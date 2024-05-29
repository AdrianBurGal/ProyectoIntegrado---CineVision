package org.iesbelen.proyecto_integrado.security.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    @Modifying
    @Query("update User u set u.firstname=:firstname, u.lastname=:lastname, u.country=:country where u.idUser =:id")
    void updateUser(@Param(value = "id") Long id, @Param(value = "firstname") String firstname, @Param(value = "lastname") String lastname, @Param(value = "country") String country);
}
