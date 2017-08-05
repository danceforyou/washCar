//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.kemile.common.service;

import com.kemile.common.dao.IBaseDAO;
import com.kemile.common.domain.BaseDomain;

@SuppressWarnings("rawtypes")
public interface IDaoAware<D extends IBaseDAO, T extends BaseDomain> {
    D getDao();
}
