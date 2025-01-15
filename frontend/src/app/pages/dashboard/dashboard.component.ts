import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/shared/header/header.component";
import { FooterComponent } from '../../components/shared/footer/footer.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AuthStateService } from '../../services/auth-state.service';
import { ChipModule } from 'primeng/chip';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

interface Competition {
  id: number;
  name: string;
  year: number;
  status: 'ongoing' | 'not_started' | 'ended';
  totalTeams: number;
  startDate: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    CommonModule,
    CardModule,
    TagModule,
    ButtonModule,
    RippleModule,
    ChipModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  competitions: Competition[] = [
    {
      id: 1,
      name: "Inter-University Cricket Championship",
      year: 2025,
      status: "ongoing",
      totalTeams: 16,
      startDate: "2025-01-01",
    },
    {
      id: 2,
      name: "University Basketball League",
      year: 2025,
      status: "not_started",
      totalTeams: 8,
      startDate: "2025-03-15",
    },
    {
      id: 3,
      name: "Swimming Championship",
      year: 2024,
      status: "ended",
      totalTeams: 12,
      startDate: "2024-12-01",
    }
  ];

  currentUser: any;

  constructor(
    private authState: AuthStateService
  ) {}

  ngOnInit() {
    this.authState.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  getStatusSeverity(status: string): 'success' | 'secondary' | 'info' {
    switch (status) {
      case 'ongoing':
        return 'success';
      case 'not_started':
        return 'info';
      case 'ended':
        return 'secondary';
      default:
        return 'secondary';
    }
  }

  getStatusText(status: string): string {
    return status.replace('_', ' ').split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  addNewCompetition(): void {
    // Implement add new competition logic
  }

  manageCompetition(competition: Competition): void {
    // Implement manage competition logic
  }
}
