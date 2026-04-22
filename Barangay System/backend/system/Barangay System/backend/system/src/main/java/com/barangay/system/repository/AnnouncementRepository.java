package com.barangay.system.repository; 

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.barangay.system.model.Announcement;


public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
    List<Announcement> findByActiveTrueOrderByCreatedAtDesc();
}