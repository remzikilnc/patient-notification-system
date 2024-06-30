package com.msparent.dto.template;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.msparent.model.Criteria;
import com.msparent.model.patient.NotificationType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TemplateRequest {
    @NotNull(message = "message cannot be null")
    @NotBlank(message = "message cannot be blank")
    private String title;

    @Size(max = 1000)
    private String htmlMessage;
    @Size(max = 1000)
    private String textMessage;
    private List<NotificationType> notificationTypes;
}
