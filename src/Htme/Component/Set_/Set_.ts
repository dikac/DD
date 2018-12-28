namespace Htme.Component.Set_ {
    /**
     *
     */
    export class Set_<T> implements Set<T> {

        constructor(private $set: Set<T> = new Set<T>())
        {
        }

        [Symbol.iterator](): IterableIterator<T>
        {
            return this.$set[Symbol.iterator]();
        }

        entries(): IterableIterator<[T, T]>
        {
            return this.$set.entries();
        }

        keys(): IterableIterator<T>
        {
            return this.$set.keys();
        }

        forEach(callbackfn: (value: T, value2: T, set: Set<T>) => void, thisArg?: any): void
        {
            this.$set.forEach(callbackfn, thisArg);
        }

        values(): IterableIterator<T>
        {
            return this.$set.values();
        }

        add(value: T) : this
        {
            this.$set.add(value);
            return this;
        }

        clear(): void
        {
            this.$set.clear();
        }

        delete(value: T): boolean
        {
            return this.$set.delete(value);
        }

        get [Symbol.toStringTag](): string
        {
            return this.$set[Symbol.toStringTag];
        }

        get size(): number
        {
            return this.$set.size;
        }

        has(value: T): boolean
        {
            return this.$set.has(value);
        }
    }

}