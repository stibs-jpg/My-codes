package com.barangay.system.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.barangay.system.model.BusinessPermit;

@Repository
public interface BusinessPermitRepository extends JpaRepository<BusinessPermit, Long> {
}