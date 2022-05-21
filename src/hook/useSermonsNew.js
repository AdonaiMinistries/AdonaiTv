import React from 'react';
import {useContext} from 'react';
import {SermonsProvider} from '../provider/SermonsProvider';

export default () => {
  const ctx = useContext(SermonsProvider);

  const setSermons = (sermon, next) => {
    ctx.setsermonsState({
      sermons: [...ctx.sermonsState.sermons, ...sermon],
      next: next,
    });
  };

  const getSermons = () => {
    return ctx.sermonsState.sermons;
  };

  const getNextpage = () => {
    return ctx.sermonsState.next;
  };

  return [setSermons, getSermons, getNextpage];
};
