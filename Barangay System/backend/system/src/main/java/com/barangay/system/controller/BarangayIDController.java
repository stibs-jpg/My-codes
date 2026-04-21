package com.barangay.system.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.barangay.system.model.BarangayID;
import com.barangay.system.service.BarangayIDService;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin(origins = "*")
public class BarangayIDController {

    private final BarangayIDService barangayIDService;

    public BarangayIDController(BarangayIDService barangayIDService) {
        this.barangayIDService = barangayIDService;
    }

    // SUBMIT REQUEST
    @PostMapping("/submit")
    public BarangayID submit(@RequestBody BarangayID request) {

        System.out.println("🔥 SUBMIT RECEIVED");
        System.out.println("LNAME: " + request.getLname());
        System.out.println("USERID: " + request.getUserId());

        request.setStatus("PENDING");
        request.setSubmittedAt(LocalDateTime.now());

        return barangayIDService.saveBarangayID(request);
    }

    // GET ALL REQUESTS
    @GetMapping("/barangay-id")
    public List<BarangayID> getAll() {
        return barangayIDService.getAllBarangayIDs();
    }

    // APPROVE REQUEST
    @PutMapping("/approve/{id}")
    public BarangayID approve(@PathVariable Long id) {
        BarangayID req = barangayIDService.getById(id);
        req.setStatus("APPROVED");
        return barangayIDService.saveBarangayID(req);
    }

    // REJECT REQUEST
    @PutMapping("/reject/{id}")
    public BarangayID reject(@PathVariable Long id) {
        BarangayID req = barangayIDService.getById(id);
        req.setStatus("REJECTED");
        return barangayIDService.saveBarangayID(req);
    }

    @GetMapping("/user/{userId}")
        public List<BarangayID> getUserRequests(@PathVariable Long userId) {
        return barangayIDService.getByUserId(userId);
}
}