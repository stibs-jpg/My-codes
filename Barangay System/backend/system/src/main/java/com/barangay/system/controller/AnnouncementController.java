package com.barangay.system.controller; 
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
 
import com.barangay.system.model.Announcement;
import com.barangay.system.service.AnnouncementService;

@RestController
@RequestMapping("/api/announcements")
@CrossOrigin(origins = "*") 
public class AnnouncementController {

    @Autowired
    private AnnouncementService service;

    @PostMapping
    public Announcement create(@RequestBody Announcement announcement) {
        return service.create(announcement);
    }

    @GetMapping
    public List<Announcement> getAll() {
        return service.getActiveAnnouncements();
    }
}