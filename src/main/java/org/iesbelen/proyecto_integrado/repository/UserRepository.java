package org.iesbelen.proyecto_integrado.repository;

import org.iesbelen.proyecto_integrado.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    @Modifying
    @Query("update User u set u.username=:username, u.lastname=:lastname, u.firstname=:firstname, u.country=:country, u.password=:password where u.idUser =:id")
    void updateUser(@Param(value = "id") Long id, @Param(value = "username") String username, @Param(value = "lastname") String lastname, @Param(value = "firstname") String firstname, @Param(value = "country") String country, @Param(value = "password") String password);
}
