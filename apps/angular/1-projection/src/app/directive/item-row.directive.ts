import { Directive, input } from "@angular/core";

interface ItemRowContext<T> {
    $implicit: T;
    character: string;
}

@Directive({
    selector: '[itemRow]'
})
export class ItemRowDirective<T> {
    public itemRow = input.required<T[]>();

    static ngTemplateContextGuard<TContext>(directive: ItemRowDirective<TContext>, ctx: unknown): ctx is ItemRowContext<TContext> {
        return true;
    }
}