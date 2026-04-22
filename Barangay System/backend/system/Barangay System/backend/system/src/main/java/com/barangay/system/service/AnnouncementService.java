package com.barangay.system.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.barangay.system.model.Announcement;
import com.barangay.system.repository.AnnouncementRepository;
@Service
public class AnnouncementService {
    @Autowired
    private AnnouncementRepository repo;

    public Announcement create(Announcement announcement) {
        announcement.setCreatedAt(LocalDateTime.now());
        announcement.setActive(true);
        return repo.save(announcement);
    }

    public List<Announcement> getActiveAnnouncements() {
        return repo.findByActiveTrueOrderByCreatedAtDesc();
    }
}
