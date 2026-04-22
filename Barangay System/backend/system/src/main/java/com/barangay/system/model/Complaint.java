package com.barangay.system.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "complaints")
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    // Add these fields after the existing ones 
    private Long id;
    
    private Long userId;
    private String status;
    private LocalDateTime submittedAt;
   

    // Complainant name (needed for the status table display)
    private String fname;
    private String lname;

    @Column(name = "incident_type", nullable = false)
    private String incidentType;

    @Column(name = "incident_start")
    private LocalDateTime incidentStart;

    @Column(name = "incident_end")
    private LocalDateTime incidentEnd;

    @Column(name = "location", nullable = false)
    private String location;

    @Column(name = "involved_persons", columnDefinition = "TEXT")
    private String involvedPersons;

    @Column(name = "narrative", columnDefinition = "TEXT")
    private String narrative;

    // Constructors
    public Complaint() {}

    public Complaint(String incidentType, LocalDateTime incidentStart,
                     LocalDateTime incidentEnd, String location,
                     String involvedPersons, String narrative) {
        this.incidentType = incidentType;
        this.incidentStart = incidentStart;
        this.incidentEnd = incidentEnd;
        this.location = location;
        this.involvedPersons = involvedPersons;
        this.narrative = narrative;
    }

    // Getters and Setters
    public Long getId() { return id; }

    public String getIncidentType() { return incidentType; }
    public void setIncidentType(String incidentType) { this.incidentType = incidentType; }

    public LocalDateTime getIncidentStart() { return incidentStart; }
    public void setIncidentStart(LocalDateTime incidentStart) { this.incidentStart = incidentStart; }

    public LocalDateTime getIncidentEnd() { return incidentEnd; }
    public void setIncidentEnd(LocalDateTime incidentEnd) { this.incidentEnd = incidentEnd; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getInvolvedPersons() { return involvedPersons; }
    public void setInvolvedPersons(String involvedPersons) { this.involvedPersons = involvedPersons; }

    public String getNarrative() { return narrative; }
    public void setNarrative(String narrative) { this.narrative = narrative; }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(LocalDateTime submittedAt) {
        this.submittedAt = submittedAt;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }
}