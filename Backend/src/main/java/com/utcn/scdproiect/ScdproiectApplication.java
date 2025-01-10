package com.utcn.scdproiect;

import com.utcn.scdproiect.Pkg.Package;
import com.utcn.scdproiect.Pkg.PackageService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.Instant;

@SpringBootApplication
public class ScdproiectApplication {

	public static void main(String[] args) {

		SpringApplication.run(ScdproiectApplication.class, args);
	}

//	PackageService packageService= new PackageService();
	//Package package1 = new Package(1,1,Date.from(Instant.now()));



}
