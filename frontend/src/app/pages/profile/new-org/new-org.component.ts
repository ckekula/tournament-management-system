import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { FileUploadModule } from 'primeng/fileupload';
import { AvatarModule } from 'primeng/avatar';
import { OrganizationService } from '../../../graphql/organization.service';

@Component({
  selector: 'app-new-org',
  standalone: true,
  imports: [
    CheckboxModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    FormsModule,
    FileUploadModule,
    AvatarModule
  ],
  templateUrl: './new-org.component.html',
  styleUrl: './new-org.component.scss'
})
export class NewOrgComponent {
  name: string = '';
  abbreviation: string = '';
  profileImage: string = 'assets/images/default-profile.png';
  selectedFile: File | null = null;

  constructor(
    private organizationService: OrganizationService,
    private router: Router // Inject Router
  ) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  createOrg() {
    let imageBase64 = this.profileImage.startsWith('data:image') ? this.profileImage : null;
    this.organizationService.createOrganization(this.name, this.abbreviation, imageBase64 ?? undefined).subscribe({
      next: (response: any) => {
        console.log('Organization created:', response);
        alert('Organization created successfully!');
        this.router.navigate([`/organization/${response.data.createOrganization.id}`]);
      },
      error: (error: any) => {
        console.error('Error creating organization:', error);
        alert('Failed to create organization.');
      }
    });
  }
}
