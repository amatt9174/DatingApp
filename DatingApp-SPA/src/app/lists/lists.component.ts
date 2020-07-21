import { AlertifyService } from './../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from './../_services/auth.service';
import { Pagination, PaginatedResult } from './../_models/pagination';
import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
})
export class ListsComponent implements OnInit {
  users: User[];
  pagination: Pagination;
  likesParam: string;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.users = data.users.result;
      this.pagination = data.users.pagination;
    });
    this.likesParam = 'Likers';
  }

  loadUsers(): void {
    this.userService.getUsers(this.pagination.currentPage.toString(), this.pagination.itemsPerPage.toString(), null, this.likesParam)
      .subscribe((res: PaginatedResult<User[]>) => {
      this.users = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }
}
