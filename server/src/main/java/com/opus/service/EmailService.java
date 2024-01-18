package com.opus.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendUserConfirmationEmail(String email, String token) throws MessagingException {
        String subject = "Welcome to Opus Corp! Confirm Your Registration";

        String htmlContent = "<p>Welcome to Opus Corp, your trusted partner in corporate management!</p>" +
                "<img src=\"https://i.ibb.co/XxMKZPR/opus-hor-whitebg-copy.jpg\" alt=\"Opus Corp Logo\" style=\"display: block; margin: 0 auto;\">" +
                "<p>Click the following link to confirm your registration:</p>" +
                "<a href=\"http://localhost:3000/confirm?token=" + token + "\">Confirm Registration</a>" +
                "<p>Welcome to Opus Corp, your trusted partner in streamlining corporate management and optimizing " +
                "employee productivity! We are thrilled to have you on board and look forward to assisting you in " +
                "managing your company's workforce seamlessly.</p>" +
                "<p>If you have any questions or need assistance, feel free to reach out to our support team at " +
                "<a href=\"mailto:opuscorppune@gmail.com\">opuscorppune@gmail.com</a>.</p>" +
                "<p>Thank you for choosing Opus Corp. Let's build a more efficient future together!</p>" +
                "<p>Best regards,<br/>Opus Corp Team</p>";

        sendEmail(email, subject, htmlContent);
    }

    private void sendEmail(String email, String subject, String content) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(email);
        helper.setSubject(subject);
        helper.setText(content, true);

        javaMailSender.send(message);
    }
}
