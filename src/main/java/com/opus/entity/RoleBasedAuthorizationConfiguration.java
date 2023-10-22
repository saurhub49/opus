package com.opus.entity;

import com.opus.enums.Permission;
import com.opus.enums.Entity;
import jakarta.persistence.*;

@jakarta.persistence.Entity
@Table(name = "role_based_authorization_configuration")
public class RoleBasedAuthorizationConfiguration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_type_id", nullable = false)
    private RoleType roleTypeId;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Entity entity;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Permission permission;
}
