package com.barangay.system.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "document_request")
public class DocumentRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // New fields from the form
    private String lname;
    private String fname;
    private String mname;
    private String address;
    private String sex;
    private String civilStatus;
    private String residency;
    private Integer yearsOfStay;
    private String contact;
    private String emergencyName;
    private String emergencyContact;
    private String emergencyRelationship;
    private String emergencyAddress;
    private String idNumber;
    private String precinctNumber;
    private String orNumber;

    private Long userId;
    private String documentType;
    private String status;
    private String remarks;
    private LocalDateTime submittedAt;

    // ===== GETTERS AND SETTERS =====
    public Long getId() { return id; }

    public String getLname() { return lname; }
    public void setLname(String lname) { this.lname = lname; }

    public String getFname() { return fname; }
    public void setFname(String fname) { this.fname = fname; }

    public String getMname() { return mname; }
    public void setMname(String mname) { this.mname = mname; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getSex() { return sex; }
    public void setSex(String sex) { this.sex = sex; }

    public String getCivilStatus() { return civilStatus; }
    public void setCivilStatus(String civilStatus) { this.civilStatus = civilStatus; }

    public String getResidency() { return residency; }
    public void setResidency(String residency) { this.residency = residency; }

    public Integer getYearsOfStay() { return yearsOfStay; }
    public void setYearsOfStay(Integer yearsOfStay) { this.yearsOfStay = yearsOfStay; }

    public String getContact() { return contact; }
    public void setContact(String contact) { this.contact = contact; }

    public String getEmergencyName() { return emergencyName; }
    public void setEmergencyName(String emergencyName) { this.emergencyName = emergencyName; }

    public String getEmergencyContact() { return emergencyContact; }
    public void setEmergencyContact(String emergencyContact) { this.emergencyContact = emergencyContact; }

    public String getEmergencyRelationship() { return emergencyRelationship; }
    public void setEmergencyRelationship(String emergencyRelationship) { this.emergencyRelationship = emergencyRelationship; }

    public String getEmergencyAddress() { return emergencyAddress; }
    public void setEmergencyAddress(String emergencyAddress) { this.emergencyAddress = emergencyAddress; }

    public String getIdNumber() { return idNumber; }
    public void setIdNumber(String idNumber) { this.idNumber = idNumber; }

    public String getPrecinctNumber() { return precinctNumber; }
    public void setPrecinctNumber(String precinctNumber) { this.precinctNumber = precinctNumber; }

    public String getOrNumber() { return orNumber; }
    public void setOrNumber(String orNumber) { this.orNumber = orNumber; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getDocumentType() { return documentType; }
    public void setDocumentType(String documentType) { this.documentType = documentType; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }

    public LocalDateTime getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(LocalDateTime submittedAt) { this.submittedAt = submittedAt; }
}