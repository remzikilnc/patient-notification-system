package com.msparent.dto.criteria;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.msparent.model.Criteria;
import com.msparent.model.Template;
import com.msparent.model.patient.Gender;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CriteriaRequest {
    private int minAge;
    private int maxAge;
    private Gender gender;
    private Template notificationTemplate;
}
