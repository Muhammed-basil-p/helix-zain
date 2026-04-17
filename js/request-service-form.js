/**
 * Unified service request form: validation, optional ?service= URL param, submit UX.
 * Expects markup under [data-request-service-form].
 */
(function () {
    'use strict';

    const SERVICE_LABELS = {
        app: 'App Development',
        web: 'Web Development',
        ai: 'Automation & AI Integrations'
    };

    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function normalizeServiceKey(raw) {
        if (!raw) return '';
        const k = String(raw).trim().toLowerCase();
        if (k === 'automation' || k === 'automation-ai') return 'ai';
        return k in SERVICE_LABELS ? k : '';
    }

    function getServiceFromSearch() {
        const params = new URLSearchParams(window.location.search);
        return normalizeServiceKey(params.get('service'));
    }

    function validate(email, phone, description) {
        const errors = [];
        const trimmedEmail = (email || '').trim();
        const trimmedPhone = (phone || '').trim();
        const trimmedDesc = (description || '').trim();

        if (!trimmedEmail) errors.push({ field: 'email', message: 'Email is required.' });
        else if (!EMAIL_RE.test(trimmedEmail)) errors.push({ field: 'email', message: 'Enter a valid email address.' });

        if (!trimmedPhone) errors.push({ field: 'phone', message: 'Contact number is required.' });

        if (!trimmedDesc) errors.push({ field: 'description', message: 'Project description is required.' });
        else if (trimmedDesc.length < 10) errors.push({ field: 'description', message: 'Description must be at least 10 characters.' });

        return { ok: errors.length === 0, errors, values: { email: trimmedEmail, phone: trimmedPhone, description: trimmedDesc } };
    }

    function clearFieldErrors(form) {
        form.querySelectorAll('.field-error').forEach((el) => el.remove());
        form.querySelectorAll('.form-group.is-invalid').forEach((el) => el.classList.remove('is-invalid'));
    }

    function showFieldError(formGroup, message) {
        if (!formGroup) return;
        formGroup.classList.add('is-invalid');
        const p = document.createElement('p');
        p.className = 'field-error';
        p.setAttribute('role', 'alert');
        p.textContent = message;
        formGroup.appendChild(p);
    }

    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    function setSubmitLoading(button, loading) {
        if (!button) return;
        if (loading) {
            button.dataset.labelDefault = button.dataset.labelDefault || button.textContent;
            button.classList.add('is-loading');
            button.disabled = true;
            button.setAttribute('aria-busy', 'true');
            button.textContent = 'Sending…';
        } else {
            button.classList.remove('is-loading');
            button.disabled = false;
            button.removeAttribute('aria-busy');
            if (button.dataset.labelDefault) button.textContent = button.dataset.labelDefault;
        }
    }

    function applyServiceFromURL(selectedRow, serviceNameEl, hiddenInput) {
        const key = getServiceFromSearch();
        if (!key) {
            selectedRow.hidden = true;
            if (hiddenInput) hiddenInput.value = '';
            return;
        }
        selectedRow.hidden = false;
        serviceNameEl.textContent = SERVICE_LABELS[key];
        if (hiddenInput) hiddenInput.value = key;
    }

    function showSuccess(feedbackEl) {
        if (feedbackEl) {
            feedbackEl.hidden = false;
            feedbackEl.textContent = 'Request sent successfully';
            feedbackEl.classList.add('is-visible');
        }

        const overlay = document.getElementById('requestSuccessOverlay');
        if (overlay) {
            overlay.classList.add('active');
            overlay.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    }

    function hideSuccess(feedbackEl) {
        if (!feedbackEl) return;
        feedbackEl.hidden = true;
        feedbackEl.classList.remove('is-visible');
        feedbackEl.textContent = '';
    }

    function init() {
        const form = document.querySelector('[data-request-service-form]');
        if (!form) return;

        const selectedRow = form.querySelector('[data-selected-service-row]');
        const serviceNameEl = form.querySelector('[data-selected-service-name]');
        const hiddenInput = form.querySelector('[data-service-key]');
        const feedbackEl = form.querySelector('[data-request-feedback]');
        const submitBtn = form.querySelector('[data-submit-request]');
        const successOverlay = document.getElementById('requestSuccessOverlay');
        const successCloseBtn = successOverlay ? successOverlay.querySelector('[data-close-request-success]') : null;

        if (selectedRow && serviceNameEl) {
            applyServiceFromURL(selectedRow, serviceNameEl, hiddenInput);
        }

        if (successOverlay) {
            const closeOverlay = () => {
                successOverlay.classList.remove('active');
                successOverlay.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            };

            if (successCloseBtn) {
                successCloseBtn.addEventListener('click', closeOverlay);
            }

            successOverlay.addEventListener('click', (e) => {
                if (e.target === successOverlay) {
                    closeOverlay();
                }
            });
        }

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            clearFieldErrors(form);
            hideSuccess(feedbackEl);

            const email = form.querySelector('[name="email"]');
            const phone = form.querySelector('[name="phone"]');
            const description = form.querySelector('[name="description"]');

            const result = validate(email && email.value, phone && phone.value, description && description.value);
            if (!result.ok) {
                result.errors.forEach((err) => {
                    const input = form.querySelector(`[name="${err.field}"]`);
                    const group = input ? input.closest('.form-group') : null;
                    showFieldError(group, err.message);
                });
                const firstInvalid = form.querySelector('.form-group.is-invalid input, .form-group.is-invalid textarea');
                if (firstInvalid) firstInvalid.focus();
                return;
            }

            setSubmitLoading(submitBtn, true);
            try {
                await delay(900);
                // Placeholder for future API: payload includes service key + fields
                showSuccess(feedbackEl);
                form.reset();
                applyServiceFromURL(selectedRow, serviceNameEl, hiddenInput);
            } finally {
                setSubmitLoading(submitBtn, false);
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
