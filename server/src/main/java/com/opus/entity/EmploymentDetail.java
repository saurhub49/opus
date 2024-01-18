package com.opus.entity;

import com.opus.enums.EmployeeType;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "employment_details")
public class EmploymentDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String employeeId;

    private String workEmail;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id")
    private Role role;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "department_id")
    private Department department;

    @Temporal(TemporalType.DATE)
    private Date hireDate;

    private Double salary;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "reporting_manager_user_id")
    private User reportingManager;

    @Enumerated(EnumType.STRING)
    private EmployeeType type;

    public EmploymentDetail() {
    }

    public EmploymentDetail(Long id, String employeeId, String workEmail, User user, Client client, Role role, Department department, Date hireDate, Double salary, User reportingManager, EmployeeType type) {
        this.id = id;
        this.employeeId = employeeId;
        this.workEmail = workEmail;
        this.user = user;
        this.client = client;
        this.role = role;
        this.department = department;
        this.hireDate = hireDate;
        this.salary = salary;
        this.reportingManager = reportingManager;
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public String getWorkEmail() {
        return workEmail;
    }

    public void setWorkEmail(String workEmail) {
        this.workEmail = workEmail;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public Date getHireDate() {
        return hireDate;
    }

    public void setHireDate(Date hireDate) {
        this.hireDate = hireDate;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public User getReportingManager() {
        return reportingManager;
    }

    public void setReportingManager(User reportingManager) {
        this.reportingManager = reportingManager;
    }

    public EmployeeType getType() {
        return type;
    }

    public void setType(EmployeeType type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "EmploymentDetail{" +
                "id=" + id +
                ", employeeId='" + employeeId + '\'' +
                ", workEmail='" + workEmail + '\'' +
                ", user=" + user +
                ", client=" + client +
                ", role=" + role +
                ", department=" + department +
                ", hireDate=" + hireDate +
                ", salary=" + salary +
                ", reportingManager=" + reportingManager +
                ", type=" + type +
                '}';
    }
}
