import {ModuleWithProviders} from '@angular/core';

export interface ISprint {
  idUser?: string;
  length: string;
  status: string;
  date: string;
  start: string;
  finish: string;
  description: string;
}


export interface ISprintResponse {
  sprint: ISprint;
  status: boolean;
  error: string;
}

export interface IRouting {
  routes: ModuleWithProviders;
  components: any[];
}

export interface IPagedResults<T> {
  count: number;
  results: T;
}
