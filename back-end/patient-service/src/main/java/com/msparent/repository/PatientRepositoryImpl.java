package com.msparent.repository;

import com.msparent.model.Patient;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.List;

public class PatientRepositoryImpl implements PatientRepositoryCustom {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Page<Patient> findPatientsByCriteria(String name, String surname, Integer age, Pageable pageable) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();

        CriteriaQuery<Patient> patientQuery = criteriaBuilder.createQuery(Patient.class);
        Root<Patient> patientRoot = patientQuery.from(Patient.class);
        patientQuery.select(patientRoot);

        List<Predicate> predicates = new ArrayList<>();
        if (name != null) {
            predicates.add(criteriaBuilder.like(criteriaBuilder.lower(patientRoot.get("name")), "%" + name.toLowerCase() + "%"));
        }
        if (surname != null) {
            predicates.add(criteriaBuilder.like(criteriaBuilder.lower(patientRoot.get("surname")), "%" + surname.toLowerCase() + "%"));
        }
        if (age != null) {
            predicates.add(criteriaBuilder.equal(patientRoot.get("age"), age));
        }

        patientQuery.where(criteriaBuilder.and(predicates.toArray(new Predicate[0])));

        List<Order> orders = new ArrayList<>();
        for (Sort.Order order : pageable.getSort()) {
            if (order.isAscending()) {
                orders.add(criteriaBuilder.asc(patientRoot.get(order.getProperty())));
            } else {
                orders.add(criteriaBuilder.desc(patientRoot.get(order.getProperty())));
            }
        }
        patientQuery.orderBy(orders);

        TypedQuery<Patient> query = entityManager.createQuery(patientQuery);
        query.setFirstResult((int) pageable.getOffset());
        query.setMaxResults(pageable.getPageSize());
        List<Patient> resultList = query.getResultList();

        CriteriaQuery<Long> countQuery = criteriaBuilder.createQuery(Long.class);
        Root<Patient> countRoot = countQuery.from(Patient.class);
        countQuery.select(criteriaBuilder.count(countRoot));
        List<Predicate> countPredicates = new ArrayList<>();
        if (name != null) {
            countPredicates.add(criteriaBuilder.like(criteriaBuilder.lower(countRoot.get("name")), "%" + name.toLowerCase() + "%"));
        }
        if (surname != null) {
            countPredicates.add(criteriaBuilder.like(criteriaBuilder.lower(countRoot.get("surname")), "%" + surname.toLowerCase() + "%"));
        }
        if (age != null) {
            countPredicates.add(criteriaBuilder.equal(countRoot.get("age"), age));
        }
        countQuery.where(criteriaBuilder.and(countPredicates.toArray(new Predicate[0])));
        Long total = entityManager.createQuery(countQuery).getSingleResult();

        return new PageImpl<>(resultList, pageable, total);
    }
}
