# Feature Map

## Quick Reference Guide

### Common Commands
- "Update the treatment plan interface"
- "Modify the client intake form"
- "Add new assessment tools for therapists"
- "Update the wellness snapshot layout"
- "Enhance the treatment journey view"
- "Modify therapist assessment workflow"

### Key Components
- Treatment Plans ("Your Treatment Journey")
	- Plan sections
	- Therapy insights
	- Notes and controls
	- Version history
	- Suggestions system

- Intake Forms ("Your Wellness Snapshot")
	- Biological factors
	- Psychological factors
	- Social factors
	- Clinical assessment
	- Form validation

- Assessment Tools
	- New assessment forms
	- Assessment list view
	- Biopsychosocial evaluation
	- Insurance compliance

- UI Components
	- Rich text editor
	- Form fields with tips
	- Data tables
	- Progress indicators
	- Notification system

---

This document maps user-friendly feature names to their corresponding code implementations. Each section includes both human-readable descriptions and machine-readable paths for efficient code editing and project management integration.

## Core Features

### Client View Features

#### Treatment Plans (Your Treatment Journey)
```yaml
feature_id: "client-treatment-plans"
friendly_name: "Your Treatment Journey"
status: "in_development"
primary_components:
	- path: "/src/pages/TreatmentPlanForm.tsx"
		purpose: "Main treatment plan interface for clients"
	- path: "/src/components/treatment-plan/PlanSection.tsx"
		purpose: "Individual sections of the treatment plan"
	- path: "/src/components/treatment-plan/TherapyInsightCard.tsx"
		purpose: "Visual cards showing treatment insights"
workflow_component: "/src/components/TreatmentPlanWorkflow.tsx"
supporting_components:
	- path: "/src/components/NoteSection.tsx"
		purpose: "Treatment plan note management"
	- path: "/src/components/NoteControls.tsx"
		purpose: "Controls for note editing and management"
	- path: "/src/components/SampleSuggestions.tsx"
		purpose: "Treatment plan suggestions"
	- path: "/src/components/SuggestionItem.tsx"
		purpose: "Individual suggestion display"
	- path: "/src/components/TherapyModality.tsx"
		purpose: "Therapy modality selection"
	- path: "/src/components/VersionHistory.tsx"
		purpose: "Treatment plan version tracking"
route: "/treatment-plan"
```

---

## Feature Map Maintenance

### Refreshing the Feature Map
To keep this document up to date with the codebase, use the command "refresh the feature map md". This will:
1. Save the current version with a timestamp in `/docs/feature-maps/archive/`
2. Generate a new version based on the current codebase
3. Maintain all sections:
   - Quick Reference Guide
   - Core Features
   - Shared Components
   - Project Management Integration
   - Usage Guide

### Structure Rules
- Each feature must have a feature_id
- All paths must be relative to src/
- Components should include a purpose description
- Status should be one of: "in_development", "stable", "deprecated"

### Version History
The feature map is versioned with each refresh. Archives can be found in:
```yaml
archive_location: "/docs/feature-maps/archive/"
naming_format: "FEATURE_MAP_YYYY_MM_DD_HH_MM.md"
```

#### Intake Forms (Your Wellness Snapshot)

```yaml
feature_id: "client-intake"
friendly_name: "Your Wellness Snapshot"
status: "in_development"
primary_components:
	- path: "/src/pages/IntakeForm.tsx"
		purpose: "Main intake form page"
	- path: "/src/components/intake/ClientIntakeForm.tsx"
		purpose: "Main intake form interface"
	- path: "/src/components/intake/IntakeFormFields.tsx"
		purpose: "Reusable intake form fields"
form_sections:
	base_path: "/src/components/intake/sections/"
	sections:
		- path: "BiologicalFactors.tsx"
			purpose: "Physical health and biological considerations"
		- path: "PsychologicalFactors.tsx"
			purpose: "Mental health and psychological assessment"
		- path: "SocialFactors.tsx"
			purpose: "Social and environmental factors"
		- path: "ClinicalAssessment.tsx"
			purpose: "Professional clinical evaluation"
data_management:
	- path: "/src/components/intake/schema.ts"
		purpose: "Form validation and data structure"
	- path: "/src/components/intake/types.ts"
		purpose: "TypeScript definitions for intake data"
	- path: "/src/hooks/useIntakeFormSubmission.ts"
		purpose: "Form submission handling"
route: "/intake"
```

### Therapist View Features

#### Treatment Plan Management
```yaml
feature_id: "therapist-treatment-plans"
friendly_name: "Treatment Plan Management"
status: "in_development"
primary_components:
	- path: "/src/pages/TreatmentPlanForm.tsx"
		purpose: "Treatment plan creation and editing interface"
	- path: "/src/components/TreatmentPlanWorkflow.tsx"
		purpose: "Workflow management for treatment plans"
	- path: "/src/components/BiopsychosocialForm.tsx"
		purpose: "Comprehensive biopsychosocial evaluation"
supporting_components:
	- path: "/src/hooks/useTreatmentSuggestions.ts"
		purpose: "Treatment suggestion management"
	- path: "/src/components/InsuranceCompliance.tsx"
		purpose: "Insurance compliance checks"
```

#### Intake and Assessment Management
```yaml
feature_id: "therapist-intake-assessment"
friendly_name: "Intake & Assessment Management"
status: "in_development"
primary_page: "/src/pages/IntakeAndAssessments.tsx"
assessment_components:
	- path: "/src/components/assessment/AssessmentsList.tsx"
		purpose: "View and manage client assessments"
	- path: "/src/components/assessment/NewAssessmentForm.tsx"
		purpose: "Create new client assessments"
intake_components:
	- path: "/src/components/intake/ClientIntakeForm.tsx"
		purpose: "Client intake form management"
route: "/records"
```

## Shared Components

### User Interface Components
```yaml
feature_id: "shared-ui"
base_path: "/src/components/ui/"
components:
	forms:
		- path: "form.tsx"
			purpose: "Form component base"
		- path: "input.tsx"
			purpose: "Input fields"
		- path: "textarea.tsx"
			purpose: "Text area inputs"
		- path: "select.tsx"
			purpose: "Dropdown selections"
		- path: "checkbox.tsx"
			purpose: "Checkbox inputs"
	layout:
		- path: "card.tsx"
			purpose: "Card containers"
		- path: "sidebar.tsx"
			purpose: "Navigation sidebar"
		- path: "tabs.tsx"
			purpose: "Tab navigation"
	feedback:
		- path: "toast.tsx"
			purpose: "Toast notifications"
		- path: "alert.tsx"
			purpose: "Alert messages"
	editors:
		- path: "rich-text-editor.tsx"
			purpose: "Rich text editing"
```

### Extended UI Components
```yaml
feature_id: "shared-ui-extended"
base_path: "/src/components/ui/"
components:
  navigation:
    - path: "navigation-menu.tsx"
      purpose: "Navigation menu structure"
    - path: "breadcrumb.tsx"
      purpose: "Breadcrumb navigation"
    - path: "menubar.tsx"
      purpose: "Menu bar component"
  dialogs:
    - path: "dialog.tsx"
      purpose: "Modal dialogs"
    - path: "alert-dialog.tsx"
      purpose: "Alert dialogs"
    - path: "drawer.tsx"
      purpose: "Slide-out drawer"
    - path: "sheet.tsx"
      purpose: "Bottom sheet component"
  inputs_extended:
    - path: "input-otp.tsx"
      purpose: "One-time password input"
    - path: "radio-group.tsx"
      purpose: "Radio button groups"
    - path: "toggle.tsx"
      purpose: "Toggle switches"
    - path: "toggle-group.tsx"
      purpose: "Grouped toggle buttons"
  data_display:
    - path: "table.tsx"
      purpose: "Data tables"
    - path: "progress.tsx"
      purpose: "Progress indicators"
    - path: "avatar.tsx"
      purpose: "User avatars"
    - path: "badge.tsx"
      purpose: "Status badges"
  overlays:
    - path: "popover.tsx"
      purpose: "Popover menus"
    - path: "tooltip.tsx"
      purpose: "Tooltips"
    - path: "hover-card.tsx"
      purpose: "Hover information cards"
    - path: "context-menu.tsx"
      purpose: "Context menus"
  layout_extended:
    - path: "aspect-ratio.tsx"
      purpose: "Aspect ratio container"
    - path: "collapsible.tsx"
      purpose: "Collapsible sections"
    - path: "separator.tsx"
      purpose: "Visual separators"
    - path: "scroll-area.tsx"
      purpose: "Scrollable containers"
    - path: "resizable.tsx"
      purpose: "Resizable elements"
  feedback_extended:
    - path: "skeleton.tsx"
      purpose: "Loading skeletons"
    - path: "toaster.tsx"
      purpose: "Toast notification container"
    - path: "sonner.tsx"
      purpose: "Sound feedback"
  visualization:
    - path: "chart.tsx"
      purpose: "Data visualization"
    - path: "carousel.tsx"
      purpose: "Image/content carousel"
```

### Utility Components
```yaml
feature_id: "shared-utils"
components:
	- path: "/src/components/AgeGroupSelector.tsx"
		purpose: "Age group selection interface"
	- path: "/src/components/RoleSelector.tsx"
		purpose: "User role selection"
	- path: "/src/components/FormFieldWithTips.tsx"
		purpose: "Form fields with helper tips"
```

### Core Infrastructure
```yaml
feature_id: "infrastructure"
routing:
	- path: "/src/App.tsx"
		purpose: "Main application routing"
	- path: "/src/pages/Index.tsx"
		purpose: "Landing page"
data_management:
	- path: "/src/integrations/supabase/client.ts"
		purpose: "Database client"
	- path: "/src/integrations/supabase/types.ts"
		purpose: "Database type definitions"
utilities:
	- path: "/src/lib/utils.ts"
		purpose: "Shared utility functions"
	- path: "/src/types/forms.ts"
		purpose: "Form type definitions"
hooks:
	- path: "/src/hooks/use-mobile.tsx"
		purpose: "Mobile device detection"
	- path: "/src/hooks/use-toast.ts"
		purpose: "Toast notification management"
```

## Project Management Integration

### Linear App Integration
```yaml
feature_mapping:
	client_treatment_plans:
		feature_id: "client-treatment-plans"
		linear_project: "Client Experience"
		linear_label: "treatment-plans"
	client_intake:
		feature_id: "client-intake"
		linear_project: "Client Experience"
		linear_label: "intake-forms"
	therapist_treatment_plans:
		feature_id: "therapist-treatment-plans"
		linear_project: "Therapist Tools"
		linear_label: "treatment-management"
	therapist_intake_assessment:
		feature_id: "therapist-intake-assessment"
		linear_project: "Therapist Tools"
		linear_label: "intake-assessment"
```

### Notion Integration
```yaml
workspace_structure:
	client_features:
		database_id: "client-features"
		view: "Treatment Journey"
		tags: ["client-facing", "treatment-plans", "intake-forms"]
	therapist_features:
		database_id: "therapist-features"
		view: "Clinical Tools"
		tags: ["therapist-facing", "treatment-management", "assessment"]
	development_tracking:
		database_id: "development-progress"
		views: ["Feature Status", "Component Progress"]
```

## Usage Guide

### For LLMs
When working on features, reference them using the feature_id and specific component paths. For example:
```yaml
task: "Modify client treatment plan view"
feature_id: "client-treatment-plans"
primary_files:
	- "/src/pages/TreatmentPlanForm.tsx"
	- "/src/components/treatment-plan/PlanSection.tsx"
	- "/src/components/TreatmentPlanWorkflow.tsx"
```

### For Developers
1. Locate features using the friendly_name or feature_id
2. Reference the primary_components for main implementation files
3. Check supporting_components for related functionality
4. Use the project management integration section for task tracking

### For Project Managers
Use the Linear App and Notion integration sections to map features to:
1. Project tracking in Linear
2. Documentation in Notion
3. Development status updates
4. Feature progress reporting

### Common Tasks Examples
```yaml
task_examples:
	modify_treatment_plan:
		description: "Modify treatment plan interface"
		feature_id: "client-treatment-plans"
		primary_files:
			- "/src/pages/TreatmentPlanForm.tsx"
			- "/src/components/treatment-plan/PlanSection.tsx"
		
	update_intake_form:
		description: "Update intake form fields"
		feature_id: "client-intake"
		primary_files:
			- "/src/components/intake/ClientIntakeForm.tsx"
			- "/src/components/intake/IntakeFormFields.tsx"
		
	enhance_assessment:
		description: "Enhance therapist assessment tools"
		feature_id: "therapist-intake-assessment"
		primary_files:
			- "/src/components/assessment/NewAssessmentForm.tsx"
			- "/src/components/BiopsychosocialForm.tsx"
```