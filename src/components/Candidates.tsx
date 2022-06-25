/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { formatNumber } from '../helpers';
import { Candidate, Election } from '../interfaces';

interface CandidatesProps {
  cityPresence: number;
  citySelected: string;
  candidates: Candidate[];
  fnElection: () => Promise<Election[]>;
}

const Candidates = ({
  cityPresence,
  citySelected,
  candidates,
  fnElection,
}: CandidatesProps) => {
  const [election, setElection] = useState<Election[]>([]);
  const [candidate, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    fnElection().then((election) => setElection(election));
  }, [citySelected]);

  useEffect(() => {
    getCandidates();
  }, [citySelected, election]);

  const candidatesInSelectedCity = (): Candidate[] => {
    return candidates.filter((candidate) => candidatesInElection(candidate));
  };

  const candidatesInElection = (candidate: Candidate): boolean =>
    election.some((election) => election.candidateId === candidate.id);

  const getCandidates = () => {
    const filteredCandidates = candidatesInSelectedCity()
      .map((candidate) => {
        const electionFilter = election.find(
          (e) => e.candidateId === candidate.id
        )!;
        const votePercent = (electionFilter!.votes / cityPresence) * 100;

        return (
          candidatesInElection(candidate) && {
            ...candidate,
            percent: formatNumber(votePercent),
            votes: formatNumber(electionFilter.votes),
          }
        );
      })
      .sort((a: any, b: any) => b.votes - a.votes);

    setCandidates(filteredCandidates as Candidate[]);
  };

  const candidatesNumber = (): number => election.length;

  return (
    <div className='candidate'>
      <div className='candidate__quantity'>{candidatesNumber()} candidatos</div>

      <div className='candidate__content'>
        {candidate.map((candidate: Candidate, candidateIndex: number) => (
          <div className='candidate__person' key={candidateIndex}>
            <span className='candidate__person--name'>
                {candidate.name}
            </span>
            <span className='candidate__person--percent'>
              {candidate.percent}%
            </span>
            <span className='candidate__person--vote'>
              {candidate.votes} votos
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Candidates;
