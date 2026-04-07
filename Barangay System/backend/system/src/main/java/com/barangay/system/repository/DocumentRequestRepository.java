package com.barangay.system.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.barangay.system.model.DocumentRequest;

@Repository
public interface DocumentRequestRepository 
        extends JpaRepository<DocumentRequest, Long> {
}