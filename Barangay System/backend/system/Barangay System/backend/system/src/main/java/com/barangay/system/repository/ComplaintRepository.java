package com.barangay.system.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.barangay.system.model.Complaint;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
}