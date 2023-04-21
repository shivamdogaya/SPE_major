package com.example.Exam;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class ExamController {
	
	@Autowired
	private ExamRepository examRepository;
	
	
   // to get all exam
	@GetMapping("/exam")
	public List<Exam> getAllExam(){
		return (List<Exam>)this.examRepository.findAll();
	}
   
   //to get details of a particular exam
	@GetMapping("/exam/{id}")
	public Exam getParticularExam(@PathVariable("id") int id){
 		 Optional<Exam> optional =  this.examRepository.findById(id);
		return optional.get();
	}

    //to add a new exam
	@PostMapping("/exam")
	public Exam addNewExam(@RequestBody Exam exam ){
		return this.examRepository.save(exam);
	}

	@DeleteMapping("/exam/{id}")
	public void deleteExam(@PathVariable("id") int id){
		this.examRepository.deleteById(id);
	}




}
