package com.barangay.system.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.barangay.system.model.BusinessPermit;
import com.barangay.system.service.BusinessPermitService;

@RestController
@RequestMapping("/api/business-permits")
@CrossOrigin(origins = "*") // allow frontend connection
public class BusinessPermitController {

    private final BusinessPermitService service;

    public BusinessPermitController(BusinessPermitService service) {
        this.service = service;
    }

    // CREATE
    @PostMapping
    public BusinessPermit createPermit(@RequestBody BusinessPermit permit) {
        return service.save(permit);
    }

    // READ ALL
    @GetMapping
    public List<BusinessPermit> getAllPermits() {
        return service.getAll();
    }

    // READ ONE
    @GetMapping("/{id}")
    public BusinessPermit getPermit(@PathVariable Long id) {
        return service.getById(id);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deletePermit(@PathVariable Long id) {
        service.delete(id);
        return "Deleted successfully";
    }
}