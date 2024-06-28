package com.msparent.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.msparent.model.patient.NotificationType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Template {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String html_message;
    private String text_message;

    @ElementCollection(targetClass = NotificationType.class)
    @CollectionTable(name = "notification_types", joinColumns = @JoinColumn(name = "template_id"))
    @Column(name = "notification_type", nullable = true)
    @Enumerated(EnumType.STRING)
    private List<NotificationType> notificationTypes;

    @JsonManagedReference
    @OneToMany(mappedBy = "notificationTemplate", cascade = CascadeType.DETACH, fetch = FetchType.LAZY)
    private List<Criteria> criterias;
}


