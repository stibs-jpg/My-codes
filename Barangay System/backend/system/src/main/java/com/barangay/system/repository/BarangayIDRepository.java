package com.barangay.system.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.barangay.system.model.BarangayID;

@Repository
public interface BarangayIDRepository 
        extends JpaRepository<BarangayID, Long> {
}