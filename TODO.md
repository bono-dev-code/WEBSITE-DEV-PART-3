# TODO: Implement Enquiry and Contact Forms with Validation and Processing

## Tasks
- [ ] Update contact.html: Add "message type" select field with options (general inquiry, complaint, feedback, other)
- [ ] Update enquiry.html: Add "volunteer" and "sponsor" options to enquiryType select
- [ ] Enhance js/main.js FormHandler: Add client-side validation for phone numbers (South African format), name length (min 2 chars), quantity (min 0.5 if provided), message length (min 10 chars)
- [ ] Update enquiryForm processing: After validation, simulate AJAX submission and generate response based on enquiry type, product, quantity (e.g., estimated cost, availability)
- [ ] Update contactForm processing: After validation, simulate AJAX submission and compile form data into mailto link for email client
- [ ] Ensure forms use action="#" and handle submission via JS with loading states
- [ ] Test forms for validation, processing, and email functionality

## Progress
- [x] Plan confirmed and TODO created
