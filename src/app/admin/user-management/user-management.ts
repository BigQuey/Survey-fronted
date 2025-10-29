import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user';
import { UserDialogComponent } from '../user-dialog/user-dialog';

// Importaciones de Material
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './user-management.html',
  styleUrl: './user-management.css',
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  isLoading = true;
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'actions'];

  constructor(
    private userService: UserService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.users = res.data; // Ajusta según tu API
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error al cargar usuarios", err);
        this.isLoading = false;
      }
    });
  }

  openDialog(user?: any): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '450px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (user) {
          // Lógica de Actualización
          this.userService.updateUser(user.id, result).subscribe(() => this.loadUsers());
        } else {
          // Lógica de Creación
          this.userService.createUser(result).subscribe(() => this.loadUsers());
        }
      }
    });
  }

  deleteUser(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      this.userService.deleteUser(id).subscribe(() => this.loadUsers());
    }
  }
}