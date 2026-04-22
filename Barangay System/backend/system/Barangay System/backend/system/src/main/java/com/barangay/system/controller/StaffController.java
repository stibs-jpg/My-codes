package com.barangay.system.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.barangay.system.model.BarangayID;
import com.barangay.system.model.Complaint;
import com.barangay.system.model.cedula;
import com.barangay.system.service.BarangayIDService;
import com.barangay.system.service.ComplaintService;
import com.barangay.system.service.cedulaservice;

@RestController
@RequestMapping("/api/staff")
@CrossOrigin(origins = "*")
public class StaffController {

    private final BarangayIDService barangayIDService;
    private final cedulaservice cedulaService;
    private final ComplaintService complaintService;

    public StaffController(
        BarangayIDService barangayIDService,
        cedulaservice cedulaService,
        ComplaintService complaintService
    ) {
        this.barangayIDService = barangayIDService;
        this.cedulaService = cedulaService;
        this.complaintService = complaintService;
    }

    @GetMapping("/all-requests")
public List<Map<String, Object>> getAllRequests() {

    List<Map<String, Object>> all = new ArrayList<>();

    // =====================
    // BARANGAY ID
    // =====================
    for (BarangayID b : barangayIDService.getAllBarangayIDs()) {
        Map<String, Object> map = new HashMap<>();
        map.put("type", "BARANGAY_ID");
        map.put("id", b.getId());
        map.put("fname", b.getFname());
        map.put("lname", b.getLname());
        map.put("status", b.getStatus());
        map.put("submittedAt", b.getSubmittedAt());
        all.add(map);
    }

    // =====================
    // CEDULA
    // =====================
    for (cedula c : cedulaService.getAllCedula()) {
        Map<String, Object> map = new HashMap<>();
        map.put("type", "CEDULA");
        map.put("id", c.getId());
        map.put("fname", c.getFname());
        map.put("lname", c.getLname());
        map.put("status", "PENDING"); // FIX: missing in model
        map.put("submittedAt", c.getCreatedAt());
        all.add(map);
    }

    // =====================
    // COMPLAINTS (FIXED)
    // =====================
    for (Complaint c : complaintService.getAllComplaints()) {
        Map<String, Object> map = new HashMap<>();
        map.put("type", "COMPLAINT");
        map.put("id", c.getId());

        // FIX: no fname/lname exists → combine placeholder
        map.put("fname", "Unknown");
        map.put("lname", "User");

        map.put("status", "PENDING"); // FIX: missing in entity
        map.put("submittedAt", c.getIncidentStart());

        map.put("incidentType", c.getIncidentType());
        map.put("location", c.getLocation());

        all.add(map);
    }

    return all;
}

    private Map<String, Object> buildMap(
        String type,
        Object id,
        String fname,
        String lname,
        String status,
        Object submittedAt
    ) {
        Map<String, Object> map = new HashMap<>();
        map.put("type", type);
        map.put("id", id);
        map.put("fname", fname);
        map.put("lname", lname);
        map.put("status", status);
        map.put("submittedAt", submittedAt);
        return map;
    }
}