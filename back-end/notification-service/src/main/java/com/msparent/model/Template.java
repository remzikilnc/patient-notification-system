package com.msparent.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    private String message;

    @JsonManagedReference
    @OneToMany(mappedBy = "notificationTemplate", cascade = CascadeType.DETACH, fetch = FetchType.LAZY)
    private List<Criteria> criteria;

}


