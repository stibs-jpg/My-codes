package com.barangay.system.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.barangay.system.model.cedula;

@Repository
public interface cedularepository extends JpaRepository<cedula, Long> {
}