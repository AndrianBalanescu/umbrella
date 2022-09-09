#pragma once

#include <stdalign.h>
#include <stddef.h>
#include <stdint.h>

typedef enum {
    A,
    B = 16,
    C,
    D = 32,
} WASM_Bar;

typedef struct WASM_Foo WASM_Foo;
struct WASM_Foo {
    struct { char *ptr; size_t len; } single;
    struct { char *ptr; size_t len; } multi[2];
    struct { char *ptr; size_t len; }* singlePtr;
    struct { char *ptr; size_t len; }* multiPtr;
    WASM_Bar kind;
};

size_t __attribute__((used)) WASM_Foo_align() {
    return alignof(WASM_Foo);
}

size_t __attribute__((used)) WASM_Foo_size() {
    return sizeof(WASM_Foo);
}

size_t __attribute__((used)) WASM_Foo_single_align() {
    return alignof(struct { char *ptr; size_t len; });
}

size_t __attribute__((used)) WASM_Foo_single_offset() {
    return offsetof(WASM_Foo, single);
}

size_t __attribute__((used)) WASM_Foo_single_size() {
    return sizeof(struct { char *ptr; size_t len; });
}

size_t __attribute__((used)) WASM_Foo_multi_align() {
    return alignof(struct { char *ptr; size_t len; }[2]);
}

size_t __attribute__((used)) WASM_Foo_multi_offset() {
    return offsetof(WASM_Foo, multi);
}

size_t __attribute__((used)) WASM_Foo_multi_size() {
    return sizeof(struct { char *ptr; size_t len; }[2]);
}

size_t __attribute__((used)) WASM_Foo_singlePtr_align() {
    return alignof(struct { char *ptr; size_t len; }*);
}

size_t __attribute__((used)) WASM_Foo_singlePtr_offset() {
    return offsetof(WASM_Foo, singlePtr);
}

size_t __attribute__((used)) WASM_Foo_singlePtr_size() {
    return sizeof(struct { char *ptr; size_t len; }*);
}

size_t __attribute__((used)) WASM_Foo_multiPtr_align() {
    return alignof(struct { char *ptr; size_t len; }*);
}

size_t __attribute__((used)) WASM_Foo_multiPtr_offset() {
    return offsetof(WASM_Foo, multiPtr);
}

size_t __attribute__((used)) WASM_Foo_multiPtr_size() {
    return sizeof(struct { char *ptr; size_t len; }*);
}

size_t __attribute__((used)) WASM_Foo_kind_align() {
    return alignof(WASM_Bar);
}

size_t __attribute__((used)) WASM_Foo_kind_offset() {
    return offsetof(WASM_Foo, kind);
}

size_t __attribute__((used)) WASM_Foo_kind_size() {
    return sizeof(WASM_Bar);
}
