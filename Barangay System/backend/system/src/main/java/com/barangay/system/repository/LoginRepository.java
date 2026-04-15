package com.barangay.system.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.barangay.system.model.Login;

public interface LoginRepository extends JpaRepository<Login, Long> {
    Optional<Login> findByEmail(String email);
}