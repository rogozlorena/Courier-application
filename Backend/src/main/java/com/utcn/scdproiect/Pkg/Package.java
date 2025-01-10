package com.utcn.scdproiect.Pkg;
import com.utcn.scdproiect.Courier.Courier;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import java.util.Date;
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Package {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "courier_id", nullable = true)
    Courier courier;
    @Column(updatable = false, nullable = false)
    @CreationTimestamp
    private Date createdOn;
    private String deliveryAddress;
    private boolean payOnDelivery;
    private PackageStatus status;
}