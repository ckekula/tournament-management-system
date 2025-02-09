import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { FileUploadModule } from 'primeng/fileupload';
import { AvatarModule } from 'primeng/avatar';
import { OrganizationService } from '../../../graphql/services/organization.service';
import { firstValueFrom } from 'rxjs';

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
  profileImage: string | null = null;
  selectedFile: File | null = null;

  constructor(
    private organizationService: OrganizationService,
    private router: Router
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

  async createOrg() {
    try {
      if (!this.name || !this.abbreviation) {
        alert('Please fill in both name and abbreviation.');
        return;
      }
  
      const variables: { name: string; abbreviation: string; image?: string; } = {
        name: this.name,
        abbreviation: this.abbreviation
      };
  
      // Only add image if it exists
      if (this.profileImage) {
        variables['image'] = this.profileImage;
      }
  
      const response = await firstValueFrom(this.organizationService.createOrganization(variables));
      
      if (response?.data?.createOrganization) {
        console.log('Organization created:', response);
        alert('Organization created successfully!');
        this.router.navigate([`/organization/${response.data.createOrganization.id}`]);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error: any) {
      console.error('Error creating organization:', error);
      alert(`Failed to create organization: ${error.message || 'Unknown error'}`);
    }
  }
}