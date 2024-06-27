package com.msparent.dto.criteria;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.msparent.model.Criteria;
import com.msparent.model.Template;
import com.msparent.model.patient.Gender;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CriteriaResponse {
    private Long id;
    private int minAge;
    private int maxAge;
    private Gender gender;
    private Template notificationTemplate;
}
