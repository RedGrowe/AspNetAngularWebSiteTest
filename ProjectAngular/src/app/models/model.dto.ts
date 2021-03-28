export class User {
  Id!: number;
  FirstName!: string;
  LastName!: string;
  UserName!: string;
  Email!: string;
  Password!: string;
  constructor(
  ) {
    this.UserName = '',
    this.Password = '';
  }
}

export class Times {
  Id!: number;
  IdUser!: number;
  Value!: number;
  FactValue!: number;
  Date!: Date;
  IsEdit!: boolean;
  constructor(
  ) {
    this.IsEdit = false;
    this.Id = 0;
    this.Value = 0;
    this.FactValue = 0;
  }
}

export class FilterTime {
  IdUser!: number;
  CourseId!: number;
  DateFrom!: Date;
  DateTo!: Date;
  DateNow!: Date;
  constructor(
  ) {
    this.IdUser = 0;
    this.CourseId = 0;
  }
}

export class SelectItem {
  label?: string;
  value: any;
  styleClass?: string;
  icon?: string;
  title?: string;
  disabled?: boolean;
}
