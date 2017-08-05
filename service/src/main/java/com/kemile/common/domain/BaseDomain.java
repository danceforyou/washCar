//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.kemile.common.domain;

import java.io.Serializable;
import java.math.BigInteger;

public class BaseDomain<T> implements Serializable {
    private static final long serialVersionUID = 6667600871541308622L;
    private T id;

    public BaseDomain() {
    }

    @SuppressWarnings("unchecked")
	public T getId() {
        return (T) (this.id instanceof BigInteger?Long.valueOf(String.valueOf(this.id)):this.id);
    }

    public void setId(T id) {
        this.id = id;
    }
    
    
}
